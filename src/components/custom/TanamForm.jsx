"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { insertTanam } from "@/utils/supabase/queries";

import FormHeader from "./FormHeader";
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

const tanamSchema = z.object({
  id_varietas: z.number().min(1, { message: "Varietas tidak boleh kosong" }),
  jumlah_tanaman: z
    .number()
    .min(1, { message: "Jumlah Tanaman tidak boleh kosong" }),
});

const formSchema = z.object({
  tanams: z.array(tanamSchema),
});

export default function TanamForm({ varietasData, greenhouseData }) {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanams: [{ id_varietas: 1, jumlah_tanaman: 1 }], // Initial field count set to 1
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tanams",
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const tanamData = formData.tanams.map((data) => ({
      ...data,
      id_gh: Number(params.greenhouseId),
    }));

    console.log(tanamData);

    await insertTanam(tanamData);
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
                      name={`tanams.${index}.id_varietas`}
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
                      name={`tanams.${index}.jumlah_tanaman`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jumlah Benih</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jumlah Tanaman varietas ini"
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
                            Jumlah Tanaman varietas wajib diisi.
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
                  onClick={() => append({ nama_gh: "", lokasi: "" })}
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
                    "Catat Event Tanam"
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
