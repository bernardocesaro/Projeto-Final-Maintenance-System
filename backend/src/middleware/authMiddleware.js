const {
    firebaseAdminAuth,
} = require("../config/firebaseAdmin");

const {
    prisma
} = require("../database/prisma");

async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.warn("Token de autenticação inválido: ", authHeader);
        return res.status(401).json({
            error: "Token de autenticação inválido",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = await firebaseAdminAuth.verifyIdToken(token);

        const user = await prisma.user.findUnique({
            where: {
                firebaseUid: decodedToken.uid,
            },
        });

        if (!user) {
            console.warn("Usuário não encontrado: ", decodedToken.uid);
            return res.status(401).json({
                error: "Usuário não encontrado",
            });
        }

        if (user.status !== "Active") {
            console.warn("Usuário inativo ou bloqueado: ", decodedToken.uid);
            return res.status(403).json({
                error: "Conta inativa ou bloqueada.",
            });
        }

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastAccess: new Date(),
            },
        });

        req.user = user;
        next();
    } catch (error) {
        console.error("Erro na autenticação:", error);
        return res.status(401).json({
            error: "Token de autenticação inválido ou expirado",
        });
    }
};

function authorize(req, res, next) {
    if (!req.user || req.user.role !== "Admin") {
        console.warn("Acesso negado para o usuário: ", req.user ? req.user.id : "Desconhecido");
        return res.status(403).json({
            error: "Acesso negado para o usuário",
        });
    }
    return next();
};

module.exports = {
    authenticate,
    authorize,
};
