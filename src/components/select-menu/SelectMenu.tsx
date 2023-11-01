import { FC, useCallback, useMemo, useState } from "react";
import { TSelectMenu } from "./SelectMenu.types";
import classNames from "classnames";

const SelectMenu: FC<TSelectMenu> = ({ data, setSelected, selected }) => {
    const [searchData, setSearchData] = useState<string>("");

    const selectedItems = useMemo(() => {
        return data?.filter((item) => selected.includes(item)) || [];
    }, [data, selected]);

    const remainingItems = useMemo(() => {
        return data?.filter((item) => !selected.includes(item)) || [];
    }, [data, selected]);

    const mergedItems = useMemo(() => {
        const filteredItems = searchData
            ? remainingItems.filter((item) =>
                item.toLowerCase().includes(searchData.toLowerCase())
            )
            : remainingItems;
        return [...selectedItems, ...filteredItems];
    }, [selectedItems, remainingItems, searchData]);

    const handleSelect = useCallback((value: string) => {
        if (selected.includes(value)) {
            setSelected(selected.filter((item) => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    }, [selected, setSelected]);

    const handleSearch = useCallback(() => {
        const filteredItems = searchData ? remainingItems.filter((item) => item.toLowerCase().includes(searchData.toLowerCase())) : remainingItems;
        const updatedMergedItems = [...selectedItems, ...filteredItems];
    }, [selectedItems, remainingItems, searchData]);

    return (
        <div className="flex flex-col gap-3 w-[350px] h-[430px]  border-black border-[0.5px] p-4 rounded-md bg-[#f8f8f8]">
            <p>Kategoriler</p>

            <div className="flex relative">
                <input
                    onChange={(e) => setSearchData(e.target.value)}
                    className="px-1.5 py-2 w-full border-black text-sm border-[0.5px]  rounded-sm"
                    type="text"
                    placeholder="kategori ara..."
                />
                <svg
                    className="absolute bg-white right-2 top-1/2 -translate-y-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14">
                    <path
                        d="M13.8 12.2l-3.9-4c.6-.8 1.1-2 1.1-3.1 0-2.8-2.3-5-5-5-2.8 0-5 2.3-5 5 0 2.8 2.2 5 5 5 .8 0 1.7-.2 2.3-.5l3.9 4.3c.2.2.6.2.8 0l.8-.8c.3-.3.3-.7 0-.9zM6 8.1c-1.7 0-3 1.4-3-3 0-1.7 1.4-3 3-3s3 1.4 3 3-1.4 3-3 3z"
                    ></path>
                </svg>
            </div>

            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {mergedItems.map((item, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            defaultChecked={true}
                            id={`checkbox${index}`}
                            className="hidden"
                        />
                        <label
                            onClick={() => handleSelect(item)}
                            htmlFor={`checkbox${index}`}
                            className="flex items-center cursor-pointer">
                            <div className="w-5 h-5 border border-gray-400  mr-2 flex items-center justify-center">
                                <div
                                    className={classNames("w-3 h-3", {
                                        "bg-[#3064d0]": selected.includes(item),
                                    })}
                                ></div>
                            </div>
                            {item.replace("&amp;", "&")}
                        </label>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={handleSearch}
                className="w-full bg-[#3064d0] p-2.5 text-white rounded-md hover:bg-[#3064d0]/80">
                Ara
            </button>
        </div>
    );
};

export default SelectMenu;
