package com.example.akademise;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;
/*
Used to update a specific event.
All the necessary local information and items in the view are declared and assigned.
Gets the information about the specific event and displays it.
The user, then, can edit it.
Makes three requests: getEvent, getTags, updateEvent.
 */

public class UpdateEventFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    private String myToken;
    private  Integer myId;
    TextView tvChosenTags;
    Button updateButton;
    Button event_update_tag_add_button;
    int privacy;
    int eventId;
    List<String> str_tags = new ArrayList<String>();
    List<String> newTags = new ArrayList<String>();
    EditText manuelNewTag;

    TextView eventType;
    TextView eventTitle;
    TextView eventBody;
    TextView eventLocation;
    TextView eventInfo;
    TextView eventLink;
    TextView eventDate;
    TextView eventTags;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        loadData();
        loadIDData();
        View view = inflater.inflate(R.layout.fragment_update_event, container, false);
        System.out.println("XXXXXXXXXXXXXX: " + getActivity());
        tvChosenTags = view.findViewById(R.id.event_update_added_tags);
        updateButton = view.findViewById(R.id.event_update_event_button);
        event_update_tag_add_button = view.findViewById(R.id.event_update_tag_add_button);

        eventType = view.findViewById(R.id.event_update_type);
        eventTitle = view.findViewById(R.id.event_update_title);
        eventBody = view.findViewById(R.id.event_update_body);
        eventLocation = view.findViewById(R.id.event_update_location);
        eventInfo = view.findViewById(R.id.event_update_extra_info);
        eventDate = view.findViewById(R.id.event_update_date);
        eventLink = view.findViewById(R.id.event_update_link);
        manuelNewTag = view.findViewById(R.id.event_update_new_tags);
        eventTags = view.findViewById(R.id.my_event_tags);
        eventId = getArguments().getInt("eventId");


        System.out.println("tvChosenTags: " + tvChosenTags.getText().toString());

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        System.out.println("Event onCreateView");
        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        Call<MyEvent> getEvent = akademiseApi.getEvent(eventId, "Bearer " + myToken);
        System.out.println("EVENT ID: " + eventId);

        getEvent.enqueue(new Callback<MyEvent>() {
            @Override
            public void onResponse(Call<MyEvent> call, Response<MyEvent> response) {
                if(!response.isSuccessful()){
                    Log.d("GetTags", "onResponse: " + response.code());
                    return;
                }
                System.out.println("UPDATE IS SUCCESSFUL");
                String myTags = "";
                MyEvent myEvent = response.body();
                EventResult eventToBeUpdated = myEvent.result;
                eventType.setText(eventToBeUpdated.type);
                eventTitle.setText(eventToBeUpdated.title);
                eventBody.setText(eventToBeUpdated.body);
                eventLocation.setText(eventToBeUpdated.location);
                eventInfo.setText(eventToBeUpdated.other);
                eventLink.setText(eventToBeUpdated.link);
                eventDate.setText(eventToBeUpdated.date);


                for (int i = 0; i < eventToBeUpdated.event_tags.size() ; i++) {
                    myTags += eventToBeUpdated.event_tags.get(i).tag + ", ";
                }
                myTags = myTags.substring(0, myTags.length()-2);

                eventTags.setText(myTags);
            }

            @Override
            public void onFailure(Call<MyEvent> call, Throwable t) {
                System.out.println("FAILURE" + t.getMessage());
            }
        });
        Call<Result> call = akademiseApi.getTags("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if(!response.isSuccessful()){
                    Log.d("GetTags", "onResponse: " + response.code());
                    return;
                }
                Result result = response.body();
                Spinner tag_spinner = (Spinner) getActivity().findViewById(R.id.event_update_tags_menu);
                List<String> tagList = result.getResult();
                tagList.add(0, "Choose Tag");
                ArrayAdapter<String> tag_adapter = new ArrayAdapter<String> (getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item,tagList);

                tag_adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                tag_spinner.setAdapter(tag_adapter);
                tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        if (position != 0) {
                            String currentText = tvChosenTags.getText().toString();
                            String tag = parent.getItemAtPosition(position).toString();
                            Log.d("Selected", "" + str_tags.toString());
                            if (!currentText.contains(tag) && !str_tags.contains(tag)) {
                                if(currentText.endsWith(":")) {
                                    currentText += " " + tag;
                                }
                                else{
                                    currentText += ", "+ tag;
                                }
                                newTags.add(tag);
                                tvChosenTags.setText(currentText);
                                int a = 2;
                            }

                        }
                    }
                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });
            }
            @Override
            public void onFailure(Call<Result> call, Throwable t) {

                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });

        Spinner tag_spinner = (Spinner) getActivity().findViewById(R.id.event_update_privacy_menu);
        List<String> privacyList = new ArrayList<String>();
        privacyList.add(0, "Choose Privacy");
        privacyList.add(1, "Private");
        privacyList.add(2, "Public");
        ArrayAdapter<String> tag_adapter = new ArrayAdapter<String> (getActivity().getBaseContext(),
                android.R.layout.simple_spinner_dropdown_item,privacyList);

        tag_adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        tag_spinner.setAdapter(tag_adapter);
        tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if(parent.getItemAtPosition(position).equals("Public")){
                    privacy = 1;
                }else{
                    privacy = 0;
                }
                System.out.println("ITEM: " + parent.getItemAtPosition(position));
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("Event Type: " + eventType.getText().toString());
                System.out.println("Event Title: " + eventTitle.getText().toString());
                System.out.println("Event Body: " + eventBody.getText().toString());
                System.out.println("Event Link: " + eventLink.getText().toString());
                System.out.println("Event Location: " + eventLocation.getText().toString());
                System.out.println("Event Date: " + eventDate.getText().toString());
                System.out.println("Event Info: " + eventInfo.getText().toString());

                Update update = new Update(eventType.getText().toString(),  eventTitle.getText().toString(), eventBody.getText().toString(),
                        eventDate.getText().toString(),eventLocation.getText().toString(),eventInfo.getText().toString(),eventLink.getText().toString(),
                        newTags, privacy);
                UpdateEvent updatedEvent = new UpdateEvent(update);

                Call<UpdateEvent> updateEvent = akademiseApi.updateEvent(eventId,updatedEvent,"Bearer " + myToken);

                updateEvent.enqueue(new Callback<UpdateEvent>() {
                    @Override
                    public void onResponse(Call<UpdateEvent> call, Response<UpdateEvent> response) {
                        if(!response.isSuccessful()){
                            System.out.println("NO SUCCESS");
                            return;
                        }
                        System.out.println("SUCCESS");
                    }

                    @Override
                    public void onFailure(Call<UpdateEvent> call, Throwable t) {
                        System.out.println("FAILURE-UPDATED: " + t.getMessage());
                    }
                });

            }
        });

        event_update_tag_add_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String thetags = manuelNewTag.getText().toString();
                List<String> newWrittenTags= Arrays.asList(thetags.split(","));
                for( int i = 0; i< newWrittenTags.size(); i++) {
                    if(!newWrittenTags.get(i).equals("")) {
                        Call<Tag> call = akademiseApi.addTag(new Tag(newWrittenTags.get(i)), "Bearer " + myToken);
                        call.enqueue(new Callback<Tag>() {
                            @Override
                            public void onResponse(Call<Tag> call, Response<Tag> response) {

                            }

                            @Override
                            public void onFailure(Call<Tag> call, Throwable t) {

                            }
                        });
                        newTags.add(newWrittenTags.get(i));
                    }
                }
            }
        });
    }


    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");

    }
    private void loadIDData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
    }

}
