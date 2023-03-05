import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { Button, TextInput, Text } from "@mantine/core";

import { useForm } from "@mantine/form";

type Props = {
  onSave: ({ content, title }: { title: string; content: string }) => void;
};

function NoteEditor({ onSave }: Props) {
  const createNote = () => {
    void onSave({ content: form.values.note, title: form.values.title });
    form.reset();
  };
  const form = useForm({
    initialValues: {
      title: "",
      note: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "First name is too short" : null),
      note: (value) => (value.length < 2 ? "Last name is too short" : null),
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.onSubmit(() => {
        void createNote();
      })}
    >
      <TextInput
        placeholder="Title"
        label="Title"
        withAsterisk
        {...form.getInputProps("title")}
      />
      <CodeMirror
        id="note"
        placeholder={"note"}
        // value={note}
        // onChange={(value) => setNote(value)}
        width="500px"
        height="30vh"
        minHeight="100%"
        minWidth="30vh"
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        className={`border ${
          form.errors.note
            ? "border-red-500 text-red-500 placeholder:placeholder-red-500"
            : "border-gray-300"
        }  text-black`}
        {...form.getInputProps("note")}
      />
      <Text component={"p"} className="text-xs text-red-500">
        {" "}
        {form.errors.note}
      </Text>
      <Button bg={"blue"} type="submit">
        Save
      </Button>
    </form>
  );
}

export default NoteEditor;
