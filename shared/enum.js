var Enums = {
    Pieces: {
        PAWN:   1 << 0,
        KNIGHT: 1 << 1,
        BISHOP: 1 << 2,
        ROOK:   1 << 3,
        QUEEN:  1 << 4,
        KING:   1 << 5,

        BLACK:  1 << 0,
        WHITE:  1 << 1
    },

    Errors: {
        ERR_MAX_ROOMS_REACHED:      0x0001,
    },

    Opcodes: {
        SMSG_HELLO:                     0x0001,
        CMSG_START_HANDSHAKE:           0x0002,
    },

    GameResults: {
        RESULT_BLACK_MATES:         0x1,
        RESULT_WHITE_MATES:         0x2,
        RESULT_STALEMATE:           0x3,
        RESULT_DRAW_PER_AGREEMENT:  0x4,
        RESULT_BLACK_RESIGNS:       0x5,
        RESULT_WHITE_RESIGNS:       0x6,
        RESULT_THREE_FOLD_REP:      0x7,
        RESULT_50_MOVES_RULE:       0x8
    },
};

if (!(typeof exports === "undefined")) {
    for (var item in Enums)
        exports[item] = Enums[item];
} else {
    for (var item in Enums)
        window[item] = Enums[item];
}