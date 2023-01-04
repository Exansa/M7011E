export default async function handler(req, res){
    const result = await getUsers();
    res.json(result)
}