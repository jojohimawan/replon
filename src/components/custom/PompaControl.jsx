"use client";

import { CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

export function PompaControl({ nodeId }) {
  const [pompaState, setPompaState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nodeId) {
      async function fetchPompa() {
        setLoading(true);
        try {
          const res = await fetch(
            `${process.env.BASE_URL}/api/pompa/${nodeId}`
          );
          const data = await res.json();
          setPompaState([data[0]]);
        } catch (error) {
          toast.warning("Gagal mengambil data pompa");
        } finally {
          setLoading(false);
        }
      }

      fetchPompa();
    }
  }, [nodeId]);

  const handleClick = useCallback(async () => {
    setLoading(true);
    const requestPayload = {
      payload: !pompaState[0]?.status_pompa,
      nodeid: nodeId,
    };

    try {
      const res = await fetch(`${process.env.BASE_URL}/api/pompa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: requestPayload.payload,
          nodeId: requestPayload.nodeid,
        }),
      });
      const data = await res.json();
      setPompaState([data[0]]);
    } catch (error) {
      toast.warning("Gagal, mohon coba lagi");
    } finally {
      setLoading(false);
    }
  }, [pompaState, nodeId]);

  if (!nodeId) {
    return <p>Error: nodeId is not defined.</p>;
  }

  return (
    <>
      <CardDescription
        className={`${
          pompaState.length === 0 ? "text-red-500" : "text-slate-500"
        }`}
      >
        {loading
          ? `Mohon tunggu...`
          : pompaState.length === 0
          ? `Data pompa kosong`
          : `Status: ${pompaState[0]?.status_pompa ? "Hidup" : "Mati"}`}
      </CardDescription>

      <Button
        onClick={handleClick}
        disabled={loading}
        className={`w-full ${
          pompaState[0]?.status_pompa
            ? "bg-red-500 hover:bg-red-400"
            : "bg-primary"
        }`}
      >
        {loading ? (
          <ReloadIcon className="animate-spin" />
        ) : pompaState.length === 0 ? (
          `Nyalakan`
        ) : (
          `${pompaState[0]?.status_pompa ? "Matikan" : "Nyalakan"}`
        )}
      </Button>
    </>
  );
}
