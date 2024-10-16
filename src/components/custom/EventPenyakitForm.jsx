"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { insertEventPenyakit } from "@/utils/supabase/queries";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ChevronLeftIcon,
  DrawingPinFilledIcon,
  PlusIcon,
  MinusIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FormHeader from "./FormHeader";

import greenhouse from "./../../../public/greenhouse.png";

const penyakitSchema = z.object({
  id_penyakit: z
    .number()
    .min(1, { message: "Penyakit / hama tidak boleh kosong" }),
});

const formSchema = z.object({
  penyakits: z.array(penyakitSchema),
});

export default function EventPenyakitForm({ penyakitData, greenhouseData }) {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      penyakits: [{ id_penyakit: 1 }], // Initial field count set to 1
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "penyakits",
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const penyakitData = formData.penyakits.map((data) => ({
      ...data,
      id_gh: Number(params.greenhouseId),
    }));

    console.log(penyakitData);

    await insertEventPenyakit(penyakitData);
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full items-center justify-between gap-y-5">
        <FormHeader greenhouseData={greenhouseData} />

        <section className="w-full h-full overflow-y-auto mt-10">
          <div className="w-full flex flex-col gap-y-5">
            <Form {...control}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 mb-6"
              >
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <h3 className="text-xl font-bold">
                      Event Penyakit / Hama ke: {index + 1}
                    </h3>
                    <FormField
                      control={control}
                      name={`penyakits.${index}.id_penyakit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Penyakit / Hama</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Daftar Penyakit / Hama">
                                  {field.value
                                    ? penyakitData.find(
                                        (v) => v.id === field.value
                                      ).nama_penyakit
                                    : "Daftar Penyakit / Hama"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {penyakitData.map((penyakit) => (
                                <SelectItem
                                  key={penyakit.id}
                                  value={penyakit.id}
                                >
                                  {penyakit.nama_penyakit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Penyakit / hama wajib diisi.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {fields.length > 1 && (
                      <Button
                        variant="destructive"
                        className="mt-2"
                        onClick={() => remove(index)}
                      >
                        <MinusIcon /> &emsp;Kurangi Penyakit
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => append({ id_penyakit: "" })}
                >
                  <PlusIcon /> &emsp;Tambah Penyakit
                </Button>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? (
                    <>
                      Mohon tunggu &emsp;{" "}
                      <ReloadIcon className="animate-spin" />
                    </>
                  ) : (
                    "Catat Event Hama / Penyakit"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
}
