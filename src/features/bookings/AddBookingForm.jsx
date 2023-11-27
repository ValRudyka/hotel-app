import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { differenceInDays, isDate } from "date-fns";
import { useSettings } from "../settings/useSettings";
import Checkbox from "../../ui/Checkbox";
import { useGetCabins } from "../cabins/useGetCabins";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useGetGuests } from "../guests/useGetGuests";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateBooking } from "./useCreateBooking";
import Button from "../../ui/Button";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.75rem 1.15rem;
  box-shadow: var(--shadow-sm);
`;

function AddBookingForm({ closeForm }) {
  const [wantBreakfast, setWantBreakfast] = useState(false);
  const [paid, setPaid] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: {
      maxGuestsPerBooking = 0,
      minBookingLength,
      maxBookingLength,
      breakfastPrice,
    } = {},
    isLoading: settingsLoading,
  } = useSettings();
  const { data: cabins, isLoading: cabinsLoading } = useGetCabins();
  const { guests, guestsLoading } = useGetGuests();
  const { addBooking, isAdding } = useCreateBooking();

  if (cabinsLoading || settingsLoading || guestsLoading) return <Spinner />;

  const submit = function (data) {
    const numNights = differenceInDays(
      new Date(data.endDate),
      new Date(data.startDate)
    );

    if (numNights < 1) {
      toast.error("Start date must start before end one");
      return;
    }

    if (numNights < minBookingLength) {
      toast.error(`Minimum nights per booking: ${minBookingLength}`);
      return;
    }

    if (numNights > maxBookingLength) {
      toast.error(`Maximum nights per booking: ${maxBookingLength}`);
      return;
    }

    const currentCabin = cabins.find((cabin) => cabin.id === +data.cabinId);

    const cabinPrice =
      (currentCabin.regularPrice - currentCabin.discount) * numNights;
    const extraPrice = wantBreakfast
      ? breakfastPrice * numNights * data.numGuests
      : 0;

    const totalPrice = cabinPrice + extraPrice;

    const newBooking = {
      ...data,
      cabinPrice,
      extraPrice,
      totalPrice,
      numNights,
      numGuests: +data.numGuests,
      isPaid: paid,
      hasBreakfast: wantBreakfast,
      status: "unconfirmed",
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    addBooking(newBooking, {
      onSuccess: closeForm,
    });
  };

  return (
    <Form onSubmit={handleSubmit(submit)} type="modal">
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "Start date is required",
            validate:
              isDate(getValues().startDate) || "You should choose a valid date",
          })}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("endDate", {
            required: "End date is required",
            validate:
              isDate(getValues().endDate) || "You should choose a valid date",
          })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="text"
          id="numGuests"
          {...register("numGuests", {
            required: "Number of guests is required",
            min: {
              value: 1,
              message: "Minimum number of guests is 1",
            },
            max: {
              value: maxGuestsPerBooking,
              message: `The maximum number of guests is ${maxGuestsPerBooking}`,
            },
          })}
        />
      </FormRow>

      <FormRow label="Further observations">
        <Input type="text" id="observations" {...register("observations")} />
      </FormRow>

      <FormRow>
        <Checkbox
          checked={wantBreakfast}
          onChange={(e) => setWantBreakfast(e.target.value)}
          id="hasBreakfast"
        >
          Add breakfast to my booking
        </Checkbox>
      </FormRow>

      <FormRow>
        <Checkbox
          checked={paid}
          onChange={(e) => setPaid(e.target.value)}
          id="isPaid"
        >
          Is my booking already paid?
        </Checkbox>
      </FormRow>

      <FormRow label="Select cabin">
        <StyledSelect {...register("cabinId")}>
          {cabins.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Select guest">
        <StyledSelect {...register("guestId")}>
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow>
        <Button
          onClick={() => closeForm()}
          $variant="danger"
          $size="medium"
          type="reset"
          disabled={isAdding}
        >
          Cancel
        </Button>
        <Button
          $variant="primary"
          $size="medium"
          type="submit"
          disabled={isAdding}
        >
          Add
        </Button>
      </FormRow>
    </Form>
  );
}

export default AddBookingForm;
