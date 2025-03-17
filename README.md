# awtrix-airpods-monitor

AirPods monitor for devices running [AWTRIX 3](https://blueforcer.github.io/awtrix3)

This project requires [Bun](https://bun.sh) (tested with v1.2.2)

### Installation

1. Clone this repository.

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a config file from the example and update it's values:

   ```bash
   cp config-example.json config.json
   ```

3. Build the binary file:

   ```bash
   pnpm run build
   ```

4. Run the installation file (tested with macOS v15.3.2):

   ```bash
   ./install.sh
   ```

   > Note: root access is required for performing local network requests.