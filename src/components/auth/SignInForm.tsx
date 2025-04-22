"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="w-full h-full" >
      <iframe
        src="http://127.0.0.1:8000/reader-appteere?epub=epub_content%2F01%2Fweberetiqprotestante&goto=epubcfi(/6/2!/4/2/740/10/1:98)"

        className="w-full h-full"

      ></iframe>
    </div>
  );
}
