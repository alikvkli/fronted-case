import SelectMenu from "../components/select-menu/SelectMenu";
import useAsyncCall from "../hooks/useAsyncCall";
import {getSelectData} from "../services/api";
import {useState} from "react";

const Home = () => {

    const {loading, data, error} = useAsyncCall(getSelectData);

    const [selected,setSelected] = useState<string[]>([]);



    return (
        <div className="flex items-center justify-center h-screen">
            <SelectMenu
                setSelected={setSelected}
                data={data?.data}
                selected={selected}
            />
        </div>
    )
}

export default Home;