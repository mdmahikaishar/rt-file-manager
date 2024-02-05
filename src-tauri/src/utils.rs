use crate::entry::IEntry;
use std::char;
use std::path::Path;

pub fn read_drives() -> Vec<IEntry> {
    (65..=90)
        .into_iter()
        .map(|i| format!("{}:", char::from_u32(i).unwrap()))
        .filter(|i| Path::new(i).exists())
        .map(|i| IEntry {
            name: format!("Drive {}", i),
            path: i,
            is_dir: false,
        })
        .collect::<Vec<IEntry>>()
}
