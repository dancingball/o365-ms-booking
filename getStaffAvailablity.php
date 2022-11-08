<?php

/** Get Token - Azure app name (booking local APP) */
/* $curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://login.microsoftonline.com/b7e28bed-bd9b-44e2-8236-ffb159f2634c/oauth2/v2.0/token?grant_type=client_credentials&client_id=aab272a9-fcaa-476c-a8e4-9c52ef1f9008&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&client_secret=p4K8Q~hAsBYlsWcCefmCm2uBGdyDBDEgrekUFcxy',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => 'grant_type=client_credentials&client_id=aab272a9-fcaa-476c-a8e4-9c52ef1f9008&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&client_secret=p4K8Q~hAsBYlsWcCefmCm2uBGdyDBDEgrekUFcxy',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/x-www-form-urlencoded',
    'Cookie: fpc=Ajca52WW545OkgEdpmX9LMzez3kWAQAAAP50D9wOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response; */
/** End Get Token */


/** Get Staff Availability */
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://graph.microsoft.com/v1.0/solutions/bookingBusinesses/TestBusiness@dwsnow.com/microsoft.graph.getStaffAvailability',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
    "staffIds": [
        "4d48c82e-f1dd-43a2-939a-9288734c38db"
    ],
    "startDateTime": {
        "dateTime": "2023-06-12T01:00:00",
        "timeZone": "Pacific Standard Time"
    },
    "endDateTime": {
        "dateTime": "2023-06-12T18:00:00",
        "timeZone": "Pacific Standard Time"
    }
}',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6ImZhNTkxYVlPSnpJYzFDZEV3Nm5SVEpqYlBzQ3ZjT3pucEwxdWV5MW5TR0EiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iN2UyOGJlZC1iZDliLTQ0ZTItODIzNi1mZmIxNTlmMjYzNGMvIiwiaWF0IjoxNjg1OTQ1NTU0LCJuYmYiOjE2ODU5NDU1NTQsImV4cCI6MTY4NTk0OTQ1NCwiYWlvIjoiRTJaZ1lQZ3dzM0ZKbWwrUjFLcWlsU2NMcnhXb0FBQT0iLCJhcHBfZGlzcGxheW5hbWUiOiJib29raW5nIGxvY2FsIiwiYXBwaWQiOiJhYWIyNzJhOS1mY2FhLTQ3NmMtYThlNC05YzUyZWYxZjkwMDgiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iN2UyOGJlZC1iZDliLTQ0ZTItODIzNi1mZmIxNTlmMjYzNGMvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiIwN2U3NTBhNC1lMDAyLTQ2YTAtYmVlOC0yNjAyY2I4ZWZjMWEiLCJyaCI6IjAuQVZzQTdZdml0NXU5NGtTQ052LXhXZkpqVEFNQUFBQUFBQUFBd0FBQUFBQUFBQUJiQUFBLiIsInJvbGVzIjpbIkJvb2tpbmdzQXBwb2ludG1lbnQuUmVhZFdyaXRlLkFsbCIsIkNhbGVuZGFycy5SZWFkIiwiQm9va2luZ3MuUmVhZC5BbGwiLCJDYWxlbmRhcnMuUmVhZEJhc2ljLkFsbCIsIkNhbGVuZGFycy5SZWFkV3JpdGUiXSwic3ViIjoiMDdlNzUwYTQtZTAwMi00NmEwLWJlZTgtMjYwMmNiOGVmYzFhIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiYjdlMjhiZWQtYmQ5Yi00NGUyLTgyMzYtZmZiMTU5ZjI2MzRjIiwidXRpIjoiRjlFSTFobVRnVW04dDNBRXBpOFlBZyIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc190Y2R0IjoxMzA5NDU1MTgwfQ.Jr43vJbdQTLiZGe_xzzg7NSOPyVsXqfovqTaeBPmfAEuwwUcnYrxhpFctMRpIdgS1BkN_tTqdGYDAhVJ4P2N0T4gv0IPOiMStolxmjdfcxBH9Ke-ClwbZ2YxV3sz32cHkUgLNRMTiG42ij2XcC7Pfz2hS2gWN3qkUZYUTc62059raCuYmbCLVB55VtyzYo91jkXd4TPZOSI3hrZQr7VzJ-5c6DMb8wx3TgS-GoUuDtP49IZyR4Gq1QPnZFUe4t0vZ0YaxrqZ-Zjhv_AyjQO4hrZRiO3_TaT4A5RGyit18Va-41F-zcjIHw10cJlCzGFD-yPoIbwiPKDCkWGz3BhGXQ',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);

echo "<pre>";
print_r( json_decode($response) );
