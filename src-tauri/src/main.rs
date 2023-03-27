// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::thread;

use frpc::frpc::{start_frpc, FrpcProps};

#[tauri::command(rename_all = "snake_case")]
fn start_frpc_client(props: FrpcProps) {
    thread::spawn(|| {
        if let Err(err) = std::panic::catch_unwind(|| start_frpc(props)) {
            eprintln!("Error occurred in thread: {:?}", err);
        }
    });
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_frpc_client])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
