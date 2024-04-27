import {
  Button,
  Select,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useStore } from "../store";
import { createSlug, uploadFile } from "../utils";
import { BiImages } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import Loading from "../components/Loading";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { IconColorPicker } from "@tabler/icons-react";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Superscript from "@tiptap/extension-superscript";
import { BubbleMenu, useEditor } from "@tiptap/react";
import SubScript from "@tiptap/extension-subscript";
import { useCreatePost } from "../hooks/post_hook";

const WritePost = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);
  const { isPending, mutate } = useCreatePost(toast, toggle, user?.token);
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState("");
  const [mapLink, setMapLink] = useState("");

  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [destinations, setDestinations] = useState(null);
  const theme = colorScheme === "dark";

  let editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: "Write article here..." }),

      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  useEffect(() => {
    file && uploadFile(setFileUrl, file);
  }, [file]);

  const handleSubmit = async () => {
    if (!fileUrl || !category || !title) {
      toast.error("All fields are required");
      return;
    }
    const slug = createSlug(title);
    mutate({
      title,
      slug,
      cat: category,
      img: fileUrl,
      desc: editor.getHTML(),
      maplink: mapLink,
      video,
      nearby: destinations,
    });
  };

  return (
    <>
      <RichTextEditor editor={editor}>
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-5 mb-8">
          <TextInput
            withAsterisk
            label="Post title"
            className="w-full flex-1"
            placeholder="Post title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            label="Category"
            defaultValue={"Temples"}
            placeholder="Pick Category"
            data={["TEMPLES", "LAKES", "WATERFALLS", "WILDLIFE", "BEACHES"]}
            onChange={(val) => setCategory(val)}
          />
         
          
          <label
            className="flex items-center gap-1 justify-center text-base cursor-pointer "
            htmlFor="imgUpload"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <BiImages />
            <span>Post Image </span>
            <div>{file ? "Image uploaded" : ""}</div>
          </label>
        </div>
        {/* <div>
          {" "}
          <label
            className="flex items-center gap-1 justify-center text-base cursor-pointer "
            htmlFor="imgUpload2"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload2"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <BiImages />
            <span>Post Image </span>
            <div>{file ? "Image uploaded 2" : ""}</div>
          </label>
          <label
            className="flex items-center gap-1 justify-center text-base cursor-pointer "
            htmlFor="imgUpload3"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload3"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <BiImages />
            <span>Post Image </span>
            <div>{file ? "Image uploaded 3" : ""}</div>
          </label>
        </div> */}
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-5 mb-8">
          

          <TextInput
            withAsterisk
            label="Post map link"
            className="w-full flex-1"
            placeholder="Post map link"
            defaultValue={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-5 mb-8">
          <TextInput
            withAsterisk
            label="Nearby Destinations"
            className="w-full flex-1"
            placeholder="Nearby Destinations"
            defaultValue={destinations}
            onChange={(e) => setDestinations(e.target.value)}
          />
        </div>
        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}
        <RichTextEditor.Toolbar sticky stickyOffset={20}>
          <RichTextEditor.ColorPicker
            colors={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={true}>
              <IconColorPicker size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.UnsetColor />
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content className="py-8" />
      </RichTextEditor>
      <div className="w-full flex items-end justify-end mt-6">
        <Button
          className={theme ? "bg-blue-600" : "bg-black"}
          onClick={() => handleSubmit()}
        >
          Submit post
        </Button>
        {/* <Loading visible = {isPending} /> */}
        <Toaster richColors />
      </div>
    </>
  );
};

export default WritePost;
