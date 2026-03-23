import { Controller, useFormContext } from "react-hook-form";
import FormLabel from "../utils/FormLabel";
import { MaxLength } from "../enum/MaxLength";
import { useState, useMemo } from "react";

import {
    debounce,
    fetchCountries,
    fetchStatesByCountry,
} from "../utils/addressApi";

export default function AddressComponent({ control, errors, prefix }: any) {

    const [countryList, setCountryList] = useState<string[]>([]);
    const [stateList, setStateList] = useState<string[]>([]);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showCountry, setShowCountry] = useState(false);

    const [country, setCountry] = useState("");

    const loadAllCountries = async () => {
        const list = await fetchCountries();
        setCountryList(list);
    };


    const debouncedCountry = useMemo(
        () =>
            debounce(async (text: string) => {

                const list = await fetchCountries();

                let filtered = list;

                if (text) {
                    filtered = list.filter((c: string) =>
                        c.toLowerCase().includes(text.toLowerCase())
                    );
                }

                setCountryList(filtered);

            }, 200),
        []
    );

    // debounce for state
    const debouncedState = useMemo(
        () =>
            debounce(async (text: string) => {

                if (!country) {
                    setStateList([]);
                    return;
                }

                const list = await fetchStatesByCountry(country);

                const filtered = list.filter((s: any) =>
                    s.toLowerCase().includes(text.toLowerCase())
                );

                setStateList(filtered);

            }, 200),
        [country]
    );


    const { watch } = useFormContext();

    const address1 = watch(`${prefix}.address1`);
    const address2 = watch(`${prefix}.address2`);
    const city = watch(`${prefix}.city`);
    const state = watch(`${prefix}.state`);
    const zipcode = watch(`${prefix}.zipcode`);

    const showRequired =
        address1 || address2 || city || country || state || zipcode;


    return (
        <div className="address-container">

           <h3 className={`address-title ${errors?.[prefix]?.addressGroup ? "address-error" : ""
                   }`}
           >Address Details</h3>


            {/* Address1 */}

            <div className="address-field">
                <FormLabel
                    label="Address 1"
                    htmlFor={`${prefix}.address1`}
                    required={showRequired}
                />

                <Controller
                    name={`${prefix}.address1`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <input
                                {...field}
                                autoComplete="new-password"
                                placeholder="Enter your address"
                                className={fieldState.error ? "input-error" : ""}
                            />

                            {fieldState.error && (
                                <p className="error-text">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </>
                    )}
                />
            </div>



            {/* Address2 */}

            <div className="address-field">
                <label>Address 2 :</label>

                <Controller
                    name={`${prefix}.address2`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <input
                                {...field}
                               autoComplete="new-password"
                                placeholder="Enter your optional address"
                            />

                            {fieldState.error && (
                                <p className="error-text">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </>
                    )}
                />
            </div>



            {/* COUNTRY */}

            <div className="address-field">

                <FormLabel
                    label="Country"
                    htmlFor={`${prefix}.country`}
                    required={showRequired}
                />

                <Controller
                    name={`${prefix}.country`}
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field, fieldState: { error } }) => (

                        <div
                            className="field"
                            style={{ position: "relative" }}
                        >

                            <input
                                {...field}
                                autoComplete="new-password"
                                placeholder="Enter country"
                                className={error ? "error-input" : ""}

                                onFocus={async () => {
                                    setShowCountry(true);

                                    if (countryList.length === 0) {
                                        await loadAllCountries();
                                    }
                                }}

                                onBlur={() => {
                                    setTimeout(() => {
                                        setShowCountry(false);
                                    }, 150);
                                }}

                                onChange={(e) => {

                                    const value = e.target.value;

                                    field.onChange(value);

                                    setCountry(value);

                                    setStateList([]);

                                    debouncedCountry(value);

                                    setShowCountry(true);
                                }}
                            />


                            {showCountry && (

                                <ul
                                    style={{
                                        position: "absolute",
                                        background: "#f1d3d3",
                                        border: "1px solid #ccc",
                                        width: "100%",
                                        maxHeight: 150,
                                        overflow: "auto",
                                        zIndex: 10,
                                    }}
                                >

                                    {countryList.length === 0 ? (

                                        <li
                                            style={{
                                                padding: 5,
                                                color: "gray",
                                            }}
                                        >
                                            No data found
                                        </li>

                                    ) : (

                                        countryList.map((c) => (

                                            <li
                                                key={c}
                                                style={{
                                                    padding: 5,
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {

                                                    field.onChange(c);

                                                    setCountry(c);

                                                    setShowCountry(false);
                                                }}
                                            >
                                                {c}
                                            </li>

                                        ))

                                    )}

                                </ul>

                            )}

                            {error && (
                                <p className="error-message">
                                    {error.message}
                                </p>
                            )}

                        </div>

                    )}
                />

            </div>



            {/* STATE */}

            <div className="address-field">

                <FormLabel
                    label="State"
                    htmlFor={`${prefix}.state`}
                    required={showRequired}
                />

                <Controller
                    name={`${prefix}.state`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (

                        <div
                            className="field"
                            style={{ position: "relative" }}
                        >

                            <input
                                {...field}
                                autoComplete="new-password"
                                maxLength={MaxLength.maxLength}
                                placeholder="Search state"
                                className={error ? "error-input" : ""}

                                onFocus={async () => {

                                    if (!country) return;

                                    const list = await fetchStatesByCountry(country);

                                    setStateList(list);

                                    setShowDropdown(true);
                                }}

                                onBlur={() => {
                                    setTimeout(() => {
                                        setShowDropdown(false);
                                    }, 150);
                                }}

                                onChange={(e) => {

                                    field.onChange(e.target.value);

                                    debouncedState(e.target.value);

                                    setShowDropdown(true);
                                }}
                            />


                            {showDropdown && stateList.length > 0 && (

                                <ul
                                    style={{
                                        position: "absolute",
                                        background: "#f1d3d3",
                                        border: "1px solid #ccc",
                                        width: "100%",
                                        maxHeight: 150,
                                        overflow: "auto",
                                        zIndex: 10,
                                    }}
                                >

                                    {stateList.map((s) => (

                                        <li
                                            key={s}
                                            style={{
                                                padding: 5,
                                                cursor: "pointer",
                                            }}

                                            onClick={() => {

                                                field.onChange(s);

                                                setShowDropdown(false);
                                            }}
                                        >
                                            {s}
                                        </li>
                                    ))}

                                </ul>
                            )}


                            {error && (
                                <p className="error-message">
                                    {error.message}
                                </p>
                            )}

                        </div>

                    )}
                />

            </div>



            {/* CITY */}

            <div className="address-field">

                <FormLabel
                    label="City"
                    htmlFor={`${prefix}.city`}
                    required={showRequired}
                />

                <Controller
                    name={`${prefix}.city`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (

                        <div className="field">

                            <input
                                type="text"
                                {...field}
                                autoComplete="new-password"
                                placeholder="Enter the City Name"
                                maxLength={MaxLength.maxLength}
                               
                                className={error ? "error-input" : ""}
                            />

                            {error && (
                                <p className="error-message">
                                    {error.message}
                                </p>
                            )}

                        </div>

                    )}
                />

            </div>



            {/* ZIPCODE */}

            <div className="address-field">

                <FormLabel
                    label="ZipCode"
                    htmlFor={`${prefix}.zipcode`}
                    required={showRequired}
                />

                <Controller
                    name={`${prefix}.zipcode`}
                    control={control}
                    render={({ field, fieldState }) => (

                        <>
                            <input
                                {...field}
                                autoComplete="new-password"
                                maxLength={MaxLength.zipcode}
                                
                                placeholder="Enter your zip code"
                                onChange={(e) => {

                                    const value =
                                        e.target.value.replace(/[^0-9]/g, "");

                                    field.onChange(value);
                                }}
                            />

                            {fieldState.error && (
                                <p className="error-text">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </>

                    )}
                />

            </div>



            {errors?.[prefix]?.addressGroup && (

                <p className="error-text">
                    {errors?.[prefix]?.addressGroup?.message}
                </p>

            )}

        </div>
    );
}