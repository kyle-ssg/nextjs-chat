export default async (req, res) => {
    console.log(process.env.MONGODB_URI)
    res.status(200).json({ foo:"bar" })
}
