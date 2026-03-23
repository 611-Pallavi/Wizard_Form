import { Controller } from "react-hook-form";
import "@/Styles/GlobalModules/RelationshipToInsured.css"
import FormLabel from "../utils/FormLabel";

type Props = {
  control: any;
  prefix: string;
};

export default function RelationshipToInsured({ control, prefix }: Props) {
  return (
    <div className="relationship-container">

     <FormLabel
  htmlFor="relationshipToInsured"
  label="Relationship To Insured"
  required
/>

      <Controller
        name={`${prefix}.relationshipToInsured`}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id="relationshipToInsured"
            className="relationship-select"
          >
            <option value="">Select Relationship</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="others">Others</option>
          </select>
        )}
      />

    </div>
  );
}