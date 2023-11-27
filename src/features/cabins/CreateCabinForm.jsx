import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabin, editId, closeForm }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: editId ? { ...cabin } : {},
  });

  const { isCreating, createCabin } = useCreateCabin(reset);
  const { isUpdating, updateCabin } = useUpdateCabin(closeForm);

  const isLoading = isCreating || isUpdating;

  const onSubmit = async function (data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (!editId) {
      createCabin({ ...data, image });
      closeForm?.();
    } else {
      updateCabin({ newData: { ...data, image }, id: editId });
      closeForm?.();
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={`${closeForm ? "modal" : "regular"}`}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2 },
          })}
        />
      </FormRow>

      <FormRow label="Capacity" error={errors?.capacity?.message}>
        <Input
          type="number"
          id="capacity"
          {...register("capacity", {
            required: "Capacity is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: (currValue) =>
              +currValue <= +getValues().regularPrice ||
              "Discount should be less or equal the price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for the website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description of cabin is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.name?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editId ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => editId || closeForm()}
          $variant="secondary"
          $size="medium"
          type="reset"
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          $variant="primary"
          type="submit"
          $size="medium"
        >
          {editId ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
