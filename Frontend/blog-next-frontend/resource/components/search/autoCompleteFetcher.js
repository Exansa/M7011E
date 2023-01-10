import { useMemo, useState } from "react";
import debounce from "lodash/debounce";
import {
  Autocomplete,
  TextField,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import PropTypes from "prop-types";
// Loosely based on MUI example
// https://mui.com/material-ui/react-autocomplete/#google-maps-place

AutoCompleteFetcher.propTypes = {
  label: PropTypes.string.isRequired,
  noOptionsText: PropTypes.string.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  defaultItems: PropTypes.array.isRequired,
  apiURL: PropTypes.string.isRequired,
  requestKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string,
  multiple: PropTypes.bool.isRequired,
  renderOptionOverride: PropTypes.func,
  avatarKey: PropTypes.string,
  noneValue: PropTypes.string.isRequired,
};

export default function AutoCompleteFetcher(props) {
  const {
    label,
    setSelectedItem,
    defaultItems,
    apiURL,
    requestKey,
    valueKey,
    avatarKey,
    multiple,
    noneValue,
    noOptionsText,
    extraParams,
  } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(defaultItems);

  // Passively fetch data from the server, used to update input suggestions
  //Since this function is called on every keystroke, it needs to be debounced to prevent spamming the server
  const passiveFetch = debounce(async (newInputValue) => {
    let body;

    if (extraParams) {
      body = {
        search: { [requestKey]: newInputValue, ...extraParams },
      };
    } else {
      body = {
        search: { [requestKey]: newInputValue },
      };
    }

    setLoading(true);
    const hit = await fetch(apiURL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    await hit.json().then((data) => {
      if (data) {
        setOptions(data);
      } else {
        setOptions(noneValue);
      }
      setLoading(false);
    });
  }, 500);

  return (
    <Autocomplete
      multiple={multiple}
      id="tag search"
      filterOptions={(x) => x}
      options={options}
      getOptionLabel={(option) =>
        option[requestKey] ? option[requestKey] : ""
      }
      noOptionsText={noOptionsText}
      isOptionEqualToValue={(option, value) =>
        option[requestKey] === value[requestKey]
      }
      onChange={(event, newSelection) => {
        if (newSelection) {
          if (valueKey) {
            setSelectedItem(newSelection[valueKey]);
          } else {
            setSelectedItem(newSelection);
          }
        } else {
          setSelectedItem(noneValue);
        }
      }}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        passiveFetch(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={label}
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        if (avatarKey) {
          return (
            <li {...props}>
              <Stack direction={"row"} spacing={2}>
                <Avatar alt={option[requestKey]} src={option[avatarKey]} />
                <Stack direction={"column"}>
                  <Typography variant="body1" color="text.primary">
                    {option[requestKey]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {option._id}
                  </Typography>
                </Stack>
              </Stack>
            </li>
          );
        } else {
          return (
            <li {...props}>
              <Stack direction={"column"}>
                <Typography variant="body1" color="text.primary">
                  {option[requestKey]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {option._id}
                </Typography>
              </Stack>
            </li>
          );
        }
      }}
    />
  );
}
