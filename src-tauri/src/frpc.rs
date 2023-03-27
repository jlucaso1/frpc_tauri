use anyhow::Result;
use serde::{Deserialize, Serialize};

use crate::config::Config;
use crate::service::Service;

#[tokio::main]
async fn start_service(config: Config) -> Result<()> {
    let mut service = Service::new(config).await?;
    service.run().await?;

    Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FrpcProps {
    pub protocol: String,
    pub local_port: u16,
    pub remote_port: u16,
    pub remote_addr: String,
    pub token: String,
}

impl FrpcProps {
    pub fn new(
        protocol: String,
        local_port: u16,
        remote_port: u16,
        remote_addr: String,
        token: String,
    ) -> Self {
        Self {
            protocol,
            local_port,
            remote_port,
            remote_addr,
            token,
        }
    }
}

pub fn start_frpc(props: FrpcProps) {
    let mut client_config = Config::new();
    client_config.load_config(&props).unwrap();
    start_service(client_config).unwrap();
}
