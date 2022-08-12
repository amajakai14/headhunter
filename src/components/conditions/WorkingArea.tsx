import { ChangeEvent, FC, useEffect, useState } from "react";
import { locationData, LocationData } from "../../data/location";
import CSS from "csstype";
import { SearchCondition } from "../../pages/jobs";
import { trpc } from "../../utils/trpc";
import { useLocale } from "../../hooks/useLocale";
interface SearchProps {
  search: SearchCondition;
  setSearch: any;
}
interface Address {
  th_name: string;
  en_name: string;
  code: number;
}

const WorkingArea: FC = (): JSX.Element => {
  const { t, locale } = useLocale();

  const AllProvince: Address[] = distinctArray(
    locationData.map((data) => ({
      th_name: data.ProvinceThai,
      en_name: data.ProvinceEng,
      code: data.province_code,
    }))
  );
  const [provinces, setProvinces] = useState<Address[]>(AllProvince);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [amphoe, setAmphoe] = useState<Address[]>([]);

  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/(?:^|\D)(\d{5})(?!\d)/g)) {
      // search for location detail
      searchLocation(parseInt(e.target.value));
    } else {
      //do not thing
      setProvinces(AllProvince);
      setDistricts([]);
      setAmphoe([]);
      console.log("notmatch");
    }
  };

  const searchLocation = (ZipCode: number) => {
    const areaFound = locationData.filter((elem) => elem.zipcode === ZipCode);
    console.log(areaFound);
    if (areaFound.length !== 0) {
      setProvinces([
        {
          th_name: areaFound[0]!.ProvinceThai,
          en_name: areaFound[0]!.ProvinceEng,
          code: areaFound[0]!.province_code,
        },
      ]);
      let amphoeArray: Address[] = [];
      let districtArray: Address[] = [];
      areaFound.map((area) => {
        amphoeArray = [
          ...amphoeArray,
          {
            th_name: area.AmphoeThai,
            en_name: area.AmphoeEng,
            code: area.amphoe_code,
          },
        ];
        districtArray = [
          ...districtArray,
          {
            th_name: area.TambonThaiShort,
            en_name: area.TambonEngShort,
            code: area.district_code,
          },
        ];
      });
      setAmphoe(distinctArray(amphoeArray));
      setDistricts(distinctArray(districtArray));
    } else {
      setProvinces(AllProvince);
      setDistricts([]);
      setAmphoe([]);
    }
  };

  const districtComponent = (District: Address[]) => {
    if (District.length === 0) return <option></option>;
    const distinctDistrict = District.map((item) => item).filter(
      (value, index, self) => self.indexOf(value) === index
    );

    return (
      <>
        {distinctDistrict.map((district, index) => {
          return (
            <option key={index} value={district.code}>
              {locale === "th" ? district.th_name : district.en_name}
            </option>
          );
        })}
      </>
    );
  };

  const handleProvince = (e: ChangeEvent<HTMLElement>) => {
    const mapProvinces: Address[] = locationData.map((elem) => ({
      th_name: elem.ProvinceThai,
      en_name: elem.ProvinceEng,
      code: elem.province_code,
    }));
    const getProvinces = distinctArray(mapProvinces);

    const selectedDistrict = e.target as HTMLSelectElement;
    console.log("province", selectedDistrict.value);
    const amphoeFound = locationData.filter(
      (elem) => elem.province_code === parseInt(selectedDistrict.value)
    );

    const amphoeArray: Address[] = distinctArray(
      amphoeFound.map((amp) => ({
        th_name: amp.AmphoeThai,
        en_name: amp.AmphoeEng,
        code: amp.amphoe_code,
      }))
    );
    setAmphoe(amphoeArray);
  };
  const handleDistrict = (e: ChangeEvent<HTMLElement>) => {
    const selectedAmphoe = e.target as HTMLSelectElement;
    const districtFound = locationData.filter(
      (elem) => elem.amphoe_code === parseInt(selectedAmphoe.value)
    );
    const districtsArray: Address[] = districtFound.map((tumbon) => ({
      th_name: tumbon.TambonThaiShort,
      en_name: tumbon.TambonEngShort,
      code: tumbon.district_code,
    }));
    setDistricts(districtsArray);
  };

  function distinctArray(inputArray: Address[]) {
    return [
      ...new Map(inputArray.map((item) => [item["code"], item])).values(),
    ];
  }

  const textAreaStyle: CSS.Properties = {
    boxShadow: "0 0 2pt grey",
  };

  return (
    <div>
      {/* condition */}
      <div className="flex flex-col lg:flex-row">
        <div className="flex p-1">
          <div className="px-2">{t.WorkingArea.Post}</div>
          <input
            onChange={(e) => handleZipCode(e)}
            name="ZipCode"
            id="ZipCode"
            type="number"
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          />
        </div>
        <div className="flex p-1">
          <div className="px-2">{t.WorkingArea.Province}</div>
          <select
            name="Province"
            id="Province"
            onChange={(e) => handleProvince(e)}
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          >
            {provinces.map((province, index) => {
              return (
                <option key={index} value={province.code}>
                  {locale === "th" ? province.th_name : province.en_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex p-1">
          <div className="px-2">{t.WorkingArea.Amphoe}</div>
          <select
            name="SubDistrict"
            id="SubDistrict"
            onChange={(e) => handleDistrict(e)}
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          >
            {amphoe &&
              amphoe.map((amp, index) => {
                return (
                  <option key={`amphoe_${index}`} value={amp.code}>
                    {locale === "th" ? amp.th_name : amp.en_name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex p-1">
          <div className="px-2">{t.WorkingArea.District}</div>
          <select
            name="District"
            id="District"
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          >
            {districts && districtComponent(districts)}
          </select>
        </div>
      </div>

      {/* Workplace */}
    </div>
  );
};

export default WorkingArea;
