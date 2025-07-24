1. **Define accepted image types**: Create a constant with MIME types for images the component should accept (e.g., JPG, PNG, GIF, WEBP). Also, define a fallback/default avatar image URL.

2. **Initialize state**:
   - Use `useState` for the avatar (image URL), error messages, and for holding any created object URL for later cleanup.
   - Use `useRef` for the file input for programmatically triggering it from a button (ensuring accessibility and custom styling).

3. **Handle file selection**:
   - Create a handler for `onChange` on the file input.
   - Get the selected file, and if none, do nothing.
   - If the file's type is not in the allowed list, set an accessible error message and stop.
   - If valid, clear any previous error and (if there was a previously created object URL) revoke it to free browser memory.
   - Create an object URL via `URL.createObjectURL(file)` and use that for previewing the image. Store the new object URL so it can be cleaned up later.

4. **Preview image**:
   - Use an `img` element whose `src` is the current avatar URL (default or preview), and set `alt` for accessibility.

5. **Accessible UI controls**:
   - Style and provide a button labeled "Change Picture" which, when clicked, focuses and opens the hidden file input, but ensures it's still accessible for keyboard/screen reader users.
   - The file input should have an `aria-label` and appropriate `accept` attribute to limit selectable formats.

6. **Error message display**:
   - Display an error message under the avatar if there's a problem, using `role="alert"` and `aria-live` for accessibility.

7. **Cleanup (memory management)**:
   - Use `useEffect` with a dependency on the `objectUrl` state value.
   - In the effect cleanup function, revoke the object URL if one exists.
   - This ensures when a new image is selected or on component unmount, memory is released.

8. **Export the component**.

This ensures accessible, safe, validated, and instant profile image preview on upload.