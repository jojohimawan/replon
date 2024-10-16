"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { insertPanen } from "@/utils/supabase/queries";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusIcon, MinusIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FormHeader from "./FormHeader";

const panenSchema = z.object({
  id_varietas: z.number().min(1, { message: "Varietas tidak boleh kosong" }),
  jumlah_produksi: z
    .number()
    .min(1, { message: "Jumlah panen tidak boleh kosong" }),
});

const formSchema = z.object({
  panens: z.array(panenSchema),
});

export default function PanenForm({ varietasData, greenhouseData }) {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      panens: [{ id_varietas: 1, jumlah_produksi: 1 }], // Initial field count set to 1
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "panens",
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const panenData = formData.panens.map((data) => ({
      ...data,
      id_gh: Number(params.greenhouseId),
    }));

    console.log(panenData);

    await insertPanen(panenData);
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
                    <h3 className="text-xl font-bold">Varietas {index + 1}</h3>
                    <FormField
                      control={control}
                      name={`panens.${index}.id_varietas`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Varietas</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Daftar Varietas">
                                  {field.value
                                    ? varietasData.find(
                                        (v) => v.id === field.value
                                      ).nama_varietas
                                    : "Daftar Varietas"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {varietasData.map((varietas) => (
                                <SelectItem
                                  key={varietas.id}
                                  value={varietas.id}
                                >
                                  {varietas.nama_varietas}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Varietas wajib diisi.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`panens.${index}.jumlah_produksi`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jumlah Panen</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jumlah Panen varietas ini"
                              {...field}
                              type="number"
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : ""
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Jumlah panen varietas wajib diisi.
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
                        <MinusIcon /> &emsp;Kurangi Varietas
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() =>
                    append({ id_varietas: "", jumlah_produksi: "" })
                  }
                >
                  <PlusIcon /> &emsp;Tambah Varietas
                </Button>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? (
                    <>
                      Mohon tunggu &emsp;{" "}
                      <ReloadIcon className="animate-spin" />
                    </>
                  ) : (
                    "Catat Event Panen"
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
