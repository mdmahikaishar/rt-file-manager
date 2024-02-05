// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use entry::IEntry;
use search::{case_insensetive_match, case_sensetive_match, get_extensions, recursive_search};
use serde::{Deserialize, Serialize};
use utils::read_drives;

mod entry;
mod search;
mod utils;

#[derive(Serialize, Deserialize)]
struct OnNavigationBack {
    is_search: bool,
    location: String,
}

#[tauri::command]
fn on_navigation_back(location: &str, is_search: bool) -> Option<OnNavigationBack> {
    if is_search {
        return Some(OnNavigationBack {
            is_search: false,
            location: location.to_string(),
        });
    }

    if location.is_empty() {
        return None;
    }

    let location = location.replace("\\", "/");
    let location = location.replace("//", "/");
    let mut location = location.split("/").collect::<Vec<&str>>();
    location.pop();

    if location.is_empty() {
        return Some(OnNavigationBack {
            is_search,
            location: String::new(),
        });
    }

    Some(OnNavigationBack {
        is_search: false,
        location: location.join("/").to_string(),
    })
}

#[derive(Serialize, Deserialize)]
struct OnNavigationNext {}

#[tauri::command]
fn on_navigation_next() -> Option<OnNavigationNext> {
    None
}

#[derive(Serialize, Deserialize)]
struct OnEntryClick {
    is_search: bool,
    location: String,
}

#[tauri::command]
fn on_entry_click(target: &str, location: &str, is_search: bool) -> Option<OnEntryClick> {
    let target = target.replace("\\", "/");
    let target = target.replace("//", "/");

    if !std::path::Path::new(&target).exists() {
        return Some(OnEntryClick {
            is_search,
            location: location.to_string(),
        });
    }

    if std::path::Path::new(&target).is_file() {
        return None;
    }

    Some(OnEntryClick {
        is_search: false,
        location: target.to_string(),
    })
}

#[derive(Serialize, Deserialize)]
struct OnLocationChange {
    is_search: bool,
    location: String,
}

#[tauri::command]
fn on_location_change(input: &str, _location: &str) -> Option<OnLocationChange> {
    let input = input.replace("\\", "/");
    let input = input.replace("//", "/");

    if !std::path::Path::new(&input).exists() {
        return None;
    }

    if std::path::Path::new(&input).is_file() {
        return None;
    }

    Some(OnLocationChange {
        is_search: false,
        location: input.to_string(),
    })
}

#[tauri::command]
fn on_search(location: &str, keyword: &str, case_sensetive: bool, extensions: &str) -> Vec<IEntry> {
    let mut value = keyword.to_string();
    let mut extensions = get_extensions(extensions);

    if case_sensetive {
        value = value.to_lowercase();
        extensions = extensions
            .into_iter()
            .map(|extension| extension.to_lowercase())
            .collect();
    }

    let predict = if case_sensetive {
        case_sensetive_match
    } else {
        case_insensetive_match
    };

    let mut context: Vec<IEntry> = Vec::new();

    recursive_search(location, &value, &extensions, &mut context, &predict);

    context
}

#[tauri::command]
fn read_dir(location: &str) -> Vec<IEntry> {
    if location.is_empty() {
        return read_drives();
    }

    if let Ok(entries) = std::fs::read_dir(&format!("{}/", location)) {
        return entries
            .flatten()
            .map(|entry| IEntry::new(entry))
            .collect::<Vec<IEntry>>();
    }

    vec![]
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            on_navigation_back,
            on_navigation_next,
            on_entry_click,
            on_location_change,
            on_search,
            read_dir,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
