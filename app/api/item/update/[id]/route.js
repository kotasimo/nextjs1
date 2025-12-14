import { NextResponse } from "next/server"
import connectDB from "../../../../utils/database"
import { ItemModel } from "../../../../utils/schemaModels"

export async function PUT(request, context) {
    const reqBody = await request.json()
    const params = await context.params
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(params.id)
        if (singleItem.email === reqBody.email) {
            await ItemModel.updateOne({ _id: params.id }, reqBody)
            return NextResponse.json({ message: "アイテム編集成功" })
        }else{
            return NextResponse.json({message: "アイテム編集失敗"})
        }
    } catch {
        return NextResponse.json({ message: "アイテム編集失敗" })
    }
}