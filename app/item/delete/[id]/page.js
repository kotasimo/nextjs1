"use client"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAuth from "../../../utils/useAuth"

const Delete = ({ params }) => {

    const { id } = use(params)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const router = useRouter()
    const loginUserEmail = useAuth()

    useEffect(() => {
        // const Params = async() => {
            // const params = await context.params
            const getSingleItem = async (id) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, { cache: "no-store" })
                const jsonData = await response.json()
                const singleItem = jsonData.singleItem

                setTitle(singleItem.title)
                setPrice(singleItem.price)
                setImage(singleItem.image)
                setDescription(singleItem.description)
                setEmail(singleItem.email)
            }
            getSingleItem(id)
        // }
        // Params()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const token = localStorage.getItem("token")
        // console.log(token)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
            router.refresh()
        } catch (err) {
            console.error("Delete Error:", err)
            alert("アイテム削除失敗")
        }
    }

    if (loginUserEmail === email) {
        return (
            <div className="page-title">
                <h1>アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    {image && (
                        <Image src={image} width={750} height={500} alt="item-image" priority />
                    )}
                    <h3>\{price}</h3>
                    <p>{description}</p>
                    <button>削除</button>
                </form>
            </div>
        )
    }else{
        return <h1>権限がありません</h1>
    }
}

export default Delete
