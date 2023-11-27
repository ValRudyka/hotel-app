import Spinner from "../../ui/Spinner";
import { useSettings } from "../../features/settings/useSettings";
import { useUpdateSetting } from "../../features/settings/useUpdateSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateSettingsForm() {
  const {
    data: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();
  const { mutate: updateSetting, isUpdating } = useUpdateSetting();

  if (isLoading) {
    return <Spinner />;
  }

  function handleBlur(e) {
    let { value, id, defaultValue } = e.target;

    //nothing has changed, do not update it either
    if (!value || defaultValue === value) {
      return;
    }

    updateSetting({ [id]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          onBlur={handleBlur}
          disabled={isUpdating}
          id="minBookingLength"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          onBlur={handleBlur}
          disabled={isUpdating}
          id="maxBookingLength"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestsPerBooking}
          onBlur={handleBlur}
          disabled={isUpdating}
          id="maxGuestsPerBooking"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={handleBlur}
          disabled={isUpdating}
          id="breakfastPrice"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
