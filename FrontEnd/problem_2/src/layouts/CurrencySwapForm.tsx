import React, { ReactNode, useEffect, useState } from "react";
import { SwapOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { dataJSON } from "data/index";
import { numberToString, formatStringToNumber } from "utils";
import { SelectAfter } from "components/SelectAfter";

interface ITypeData {
  currency: string;
  date: string;
  price: number;
  icon: ReactNode;
}
export const CurrencySwapForm: React.FC = () => {
  const [data, setData] = useState<ITypeData[]>([]);
  const [currency, setCurrency] = useState<string>("");
  const [typeCurrency, setTypeCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [typeToCurrency, setTypeToCurrency] = useState<string>("");

  useEffect(() => {
    setData(dataJSON);
    setTypeCurrency(dataJSON[0].currency);
    setTypeToCurrency(dataJSON[2].currency);
  }, []);
  useEffect(() => {
    const value = formatStringToNumber(currency);
    fcCurrency(value.toString());
  }, [typeCurrency]);
  const fcCurrency = (value: string) => {
    const price =
      dataJSON.find((item) => item.currency === typeToCurrency)?.price || 1;
    const priceCurrency =
      dataJSON.find((item) => item.currency === typeCurrency)?.price || 1;
    const changeNumber =
      (formatStringToNumber(value.toString()) * price) / priceCurrency;
    setToCurrency(numberToString(changeNumber.toString()).toString());
  };
  useEffect(() => {
    const value = formatStringToNumber(toCurrency);
    fcToCurrency(value.toString());
  }, [typeToCurrency]);
  const fcToCurrency = (value: string) => {
    const price =
      dataJSON.find((item) => item.currency === typeToCurrency)?.price || 1;
    const priceCurrency =
      dataJSON.find((item) => item.currency === typeCurrency)?.price || 1;
    const changeNumber = (formatStringToNumber(value) * priceCurrency) / price;
    setCurrency(numberToString(changeNumber.toString()).toString());
  };
  return (
    <div className="container mx-auto p-4">
      <div className="border border-gray-300 p-4 rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="flex flex-1">
            <div className="flex flex-col w-full items-start gap-1">
              <label>Số tiền</label>
              <Input
                value={currency}
                onChange={(e) => {
                  const value = numberToString(e.target.value);
                  setCurrency(value.toString());
                  fcCurrency(value.toString());
                }}
                addonAfter={
                  <SelectAfter
                    data={data}
                    category={typeCurrency}
                    setCategory={setTypeCurrency}
                  />
                }
              />
            </div>
          </div>
          <div className="mt-5">
            <SwapOutlined
              onClick={() => {
                const tempValue = currency;
                setCurrency(toCurrency);
                setToCurrency(tempValue);
                const tempType = typeCurrency;
                setTypeCurrency(typeToCurrency);
                setTypeToCurrency(tempType);
              }}
            />
          </div>
          <div className="flex flex-1">
            <div className="flex flex-col w-full items-start gap-1">
              <label>Chuyển đổi thành</label>
              <Input
                value={toCurrency}
                onChange={(e) => {
                  const value = numberToString(e.target.value);
                  setToCurrency(value.toString());
                  fcToCurrency(value.toString());
                }}
                addonAfter={
                  <SelectAfter
                    data={data}
                    category={typeToCurrency}
                    setCategory={setTypeToCurrency}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
