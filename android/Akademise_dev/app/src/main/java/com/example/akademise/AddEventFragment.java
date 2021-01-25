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
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class AddEventFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    private String myToken;
    private  Integer myId;
    TextView tvChosenTags;
    Button addButton;
    int privacy;
    List<String> str_tags = new ArrayList<String>();
    List<String> newTags = new ArrayList<String>();

    TextView eventType;
    TextView eventTitle;
    TextView eventLocation;
    TextView eventInfo;
    TextView eventLink;
    TextView eventDate;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        loadData();
        loadIDData();
        View view = inflater.inflate(R.layout.fragment_add_event, container, false);
        System.out.println("XXXXXXXXXXXXXX: " + getActivity());
        tvChosenTags = view.findViewById(R.id.event_added_tags);
        addButton = view.findViewById(R.id.event_add_event_button);

        eventType = view.findViewById(R.id.my_event_type);
        eventTitle = view.findViewById(R.id.my_event_title);
        eventLocation = view.findViewById(R.id.my_event_location);
        eventInfo = view.findViewById(R.id.my_event_info);
        eventDate = view.findViewById(R.id.my_event_date);
        eventLink = view.findViewById(R.id.my_event_link);

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
        System.out.println("Event OnViewCreated");
        super.onViewCreated(view, savedInstanceState);

        Call<Result> call = akademiseApi.getTags("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if(!response.isSuccessful()){
                    Log.d("GetTags", "onResponse: " + response.code());
                    return;
                }
                Result result = response.body();
                Spinner tag_spinner = (Spinner) getActivity().findViewById(R.id.event_tags_menu);
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

        Spinner tag_spinner = (Spinner) getActivity().findViewById(R.id.event_privacy_menu);
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

        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AddEvent newEvent = new AddEvent(myId, eventType.getText().toString(), privacy, eventTitle.getText().toString(), "This is a body",
                        eventLink.getText().toString(), eventLocation.getText().toString(),
                        eventDate.getText().toString(),eventInfo.getText().toString(), newTags);

                Call<AddEvent> addEvent = akademiseApi.addEvent(newEvent,"Bearer " + myToken);

                addEvent.enqueue(new Callback<AddEvent>() {
                    @Override
                    public void onResponse(Call<AddEvent> call, Response<AddEvent> response) {
                        if(!response.isSuccessful()){
                            System.out.println("NO SUCCESS");
                            return;
                        }
                    }

                    @Override
                    public void onFailure(Call<AddEvent> call, Throwable t) {

                    }
                });

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
