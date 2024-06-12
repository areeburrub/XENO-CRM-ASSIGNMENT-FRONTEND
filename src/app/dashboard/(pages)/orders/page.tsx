import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import Link from "next/link";
import {columns, Customer} from "./columns";
import {DataTable} from "./data-table";
import { headers } from 'next/headers'
import axios from "axios";

async function getData(): Promise<Customer[]> {

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`;
    const headersList = headers()
    const response = await axios.get(url, {
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'application/json',
            Cookie: headersList.get('cookie') || '',
        },
        params: {
            limit: 50,
            skip: 0
        },
        withCredentials: true,
    });

    return response.data
}

const DashboardPage = async () => {

    const data = await getData();

    return(
        <div className={"flex flex-col gap-2 justify-start"}>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className={'text-2xl font-bold'}>
                    Orders
                </h1>
                <Link href={'/dashboard/orders/new'} passHref={true}>
                    <Button>
                        <Plus/>
                        Create Order
                    </Button>
                </Link>
            </div>
            <div className="py-4">
                <DataTable columns={columns} data={data}/>
            </div>
        </div>
    )
}

export default DashboardPage;