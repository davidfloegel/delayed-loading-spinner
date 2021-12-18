# Delayed loading

A quick example to delay the loading spinner until the request hits 1 second to
reduce the amount of spinners and increase perceived loading speed.

**Rules:**

- If loading takes less than 1second, show the content as soon as loading is finished
- If loading takes more than 1 second but less than 2, show a spinner for full 2 seconds
- If loading takes more than 2 seconds, show spinner until loading finishes
