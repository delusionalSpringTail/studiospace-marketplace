import { auth } from "@/lib/auth";
import { headers } from "next/headers";




const addNewStudio = async() => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    
    
    console.log(session?.session.token);
    return (
        <div>
            add new studio
        </div>
    );
};

export default addNewStudio;