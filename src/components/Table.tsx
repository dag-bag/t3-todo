import {
  createStyles,
  Text,
  rem,
  ScrollArea,
  Button,
  Chip,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { AiFillDelete } from "react-icons/ai";

import { api, RouterOutputs } from "~/utils/api";

import { useAtom } from "jotai";
import { SelectedTopicAtom } from "~/pages";
import { DeleteTopicAtom } from "~/store/delete";

interface DndListProps {
  data?: TopicProps[];
  refetchTopics: () => void;
}
type TopicProps = RouterOutputs["topic"]["getAll"][0];
const Topic = ({ data, refetchTopics }: DndListProps) => {
  const [IsDeleting, setIsDeleting] = useAtom(DeleteTopicAtom);
  const [value, setValue] = useAtom(SelectedTopicAtom);
  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: refetchTopics,
  });
  const deleteNotes = api.note.deleteAllNotes.useMutation({
    onSuccess: () => {
      refetchTopics();
      setIsDeleting(false);
    },
  });

  const items = data?.map((item) => (
    <Box
      onClick={() => setValue(item)}
      className="mt-4"
      bg={value?.id === item.id ? "orange" : ""}
      key={item.id}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",
        position: "relative",
      })}
    >
      <LoadingOverlay visible={IsDeleting} overlayBlur={2} />

      <AiFillDelete
        className="absolute top-2 left-2"
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleting(true);
          setValue(null);
          deleteNotes.mutate({ topicId: item.id });
          deleteTopic.mutate({ id: item.id });
        }}
      />
      <Text>{item.title}</Text>
    </Box>
  ));
  return <ScrollArea h={250}> {items}</ScrollArea>;
};

export default Topic;
