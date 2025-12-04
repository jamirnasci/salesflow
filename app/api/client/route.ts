import { sequelize} from "@/lib/config/DB";
import { syncDB } from "@/lib/config/sync";

export const runtime = "nodejs";

export async function GET() {
    await syncDB()
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    return Response.json({ msg: "ok" });

}

export async function POST(req: Request) {
    console.log(req.body)
    return Response.json('ok')
}