import {
  Accordion,
  createStyles,
  LoadingOverlay,
  rem,
  TypographyStylesProvider,
} from "@mantine/core";
import { useAtomValue } from "jotai";
import { AiFillDelete } from "react-icons/ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { SelectedTopicAtom } from "~/pages";
import { DeleteTopicAtom } from "~/store/delete";
import { api, RouterOutputs } from "~/utils/api";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    border: `${rem(1)} solid transparent`,
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      transform: "scale(1.03)",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));
type TopicProps = RouterOutputs["note"]["getALL"][0];
export default function NoteCards({
  noteData,
  refetchNotes,
}: {
  noteData?: TopicProps[];
  refetchNotes: () => void;
}) {
  const { classes } = useStyles();
  const deleteNote = api.note.delete.useMutation({
    onSuccess: void refetchNotes(),
  });
  const visible = useAtomValue(DeleteTopicAtom);
  return (
    <Accordion
      mx="auto"
      variant="filled"
      defaultValue="customization"
      classNames={classes}
      className={classes.root}
    >
      {noteData?.map((item) => {
        return (
          <Accordion.Item value={item.id} key={item.id}>
            <LoadingOverlay visible={visible} overlayBlur={2} />
            <Accordion.Control>{item.title}</Accordion.Control>
            <Accordion.Panel>
              <TypographyStylesProvider>
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </TypographyStylesProvider>
              <AiFillDelete
                cursor={"pointer"}
                onClick={() => deleteNote.mutate({ id: item.id })}
              />
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}

      {/* ... Accordion items */}
    </Accordion>
  );
}
