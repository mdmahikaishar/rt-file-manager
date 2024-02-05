use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IEntry {
    pub name: String,
    pub path: String,
    pub is_dir: bool,
}

impl IEntry {
    pub fn new(entry: std::fs::DirEntry) -> Self {
        Self {
            name: entry.file_name().to_str().unwrap().to_string(),
            path: entry.path().to_str().unwrap().to_string(),
            is_dir: entry.path().is_dir(),
        }
    }
}
