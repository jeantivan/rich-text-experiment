import { useState, useLayoutEffect } from "react";
import { $getRoot, LexicalEditor } from "lexical";

export const useIsEditorEmpty = (editor: LexicalEditor) => {
  const [isEmpty, setIsEmpty] = useState(
    editor.getEditorState().read(() => $getRoot().getFirstChild()?.isEmpty())
  );

  useLayoutEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const currentIsEmpty = editorState.read(() =>
        $getRoot().getFirstChild()?.isEmpty()
      );
      setIsEmpty(currentIsEmpty);
    });
  }, [editor]);

  return isEmpty;
};
