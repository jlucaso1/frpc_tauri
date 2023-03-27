import { createSignal } from "solid-js";

import { invoke } from "@tauri-apps/api";

type FrpcProps = {
  protocol: string;
  local_port: number;
  remote_port: number;
  remote_addr: string;
  token: string;
};

export const Service = () => {
  const [config, setConfig] = createSignal<FrpcProps>({
    protocol: "tcp",
    local_port: 3000,
    remote_port: 3000,
    remote_addr: "",
    token: "",
  });

  return (
    <tr>
      <th>1</th>
      <td>
        {/* <input type="checkbox" class="checkbox" onChange={(e: any) => {}} /> */}
        <button
          class="btn"
          onClick={async () => {
            console.log({
              props: config(),
            });
            const result = await invoke("start_frpc_client", {
              props: config(),
            });

            console.log(result);
          }}
        >
          Start
        </button>
      </td>
      <td>
        <input
          type="number"
          class="input input-bordered w-24"
          value={config().local_port}
          onChange={(e: any) =>
            setConfig((prev) => ({
              ...prev,
              local_port: parseInt(e.target.value),
            }))
          }
        />
      </td>
      <td>
        <input
          type="number"
          class="input input-bordered w-24"
          value={config().remote_port}
          onChange={(e: any) =>
            setConfig((prev) => ({
              ...prev,
              remote_port: parseInt(e.target.value),
            }))
          }
        />
      </td>
      <td>
        <input
          type="text"
          class="input input-bordered"
          value={config().remote_addr}
          onChange={(e: any) =>
            setConfig((prev) => ({
              ...prev,
              remote_addr: e.target.value,
            }))
          }
        />
      </td>
      <td>
        <input
          type="text"
          class="input input-bordered"
          value={config().token}
          onChange={(e: any) =>
            setConfig((prev) => ({
              ...prev,
              token: e.target.value,
            }))
          }
        />
      </td>
    </tr>
  );
};
