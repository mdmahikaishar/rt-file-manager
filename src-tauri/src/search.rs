use crate::entry::IEntry;

/// Recusive Search
/// 
pub fn recursive_search(
    path: &str,
    target_value: &str,
    target_extensions: &[String],
    context: &mut Vec<IEntry>,
    predict: &impl Fn(&str, &str, &str, &[String]) -> bool,
) {
    let entries = std::fs::read_dir(path);

    if entries.is_err() {
        return;
    }

    for entry in std::fs::read_dir(path).unwrap() {
        if entry.is_err() {
            continue;
        }

        let entry = entry.unwrap();
        let entry_path = entry.path();

        let file_name = entry.file_name();
        let file_name = file_name.to_str().unwrap();
        let file_ext = entry_path.extension().unwrap_or_default();
        let file_ext = file_ext.to_str().unwrap();

        if entry_path.is_dir() {
            let file_path = entry_path.to_str().unwrap();
            recursive_search(file_path, target_value, target_extensions, context, predict);
        }

        if !predict(file_name, file_ext, target_value, target_extensions) {
            continue;
        }

        context.push(IEntry::new(entry));
    }
}

/// Case Insensetive Match
///
pub fn case_insensetive_match(
    file_name: &str,
    file_ext: &str,
    target_value: &str,
    target_extensions: &[String],
) -> bool {
    file_name.contains(target_value) || target_extensions.contains(&file_ext.to_string())
}

/// Case Sensetive Match
///
/// `value` & `extensions` match be passed as lowercase.
pub fn case_sensetive_match(
    file_name: &str,
    file_ext: &str,
    target_value: &str,
    target_extensions: &[String],
) -> bool {
    let file_name = file_name.to_lowercase();
    let file_ext = file_ext.to_lowercase();

    case_insensetive_match(&file_name, &file_ext, target_value, target_extensions)
}

pub fn get_extensions(value: &str) -> Vec<String> {
    if value.is_empty() {
        return vec![];
    }

    let value = value.replace(" ", "");
    value
        .split(",")
        .map(|value| value.to_string())
        .collect::<Vec<String>>()
}