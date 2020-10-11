import {io} from "../../server";

export const ws_update = async (req: any, res: any, next: any) => {
    io.sockets.emit("change", {url: req.originalUrl});
    next();
};