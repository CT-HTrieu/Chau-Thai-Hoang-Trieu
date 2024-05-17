import React, { ReactNode, useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;
interface ITypeData {
  currency: string;
  date: string;
  price: number;
  icon: ReactNode;
}
interface ITypeProp {
  data: ITypeData[];
  setCategory: (value: string) => void;
  category: string;
}
export const SelectAfter: React.FC<ITypeProp> = ({
  data,
  setCategory,
  category,
}) => {

  return (
    <Select
      value={category}
      onChange={(e) => {
        setCategory(e);
      }}
    >
      {data?.map((item: ITypeData) => {
        return (
          <Option value={item?.currency} key={item?.currency}>
            <div className="flex gap-1 items-center">
              {item?.icon}
              <span>{item.currency}</span>
            </div>
          </Option>
        );
      })}
    </Select>
  );
};
