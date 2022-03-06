export default async function errorHandler(err, req, res, next) {
    try {
        const responce = await err;
        return res.status(responce.status).json(responce.data || { msg: responce.message });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:error});
    }
}