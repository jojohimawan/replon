'use client';

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export function GreenhouseSwitch({switchProps}) {

    const [isChecked, setIsChecked] = useState(switchProps);

    return(
        <Switch 
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
        />
    );
}