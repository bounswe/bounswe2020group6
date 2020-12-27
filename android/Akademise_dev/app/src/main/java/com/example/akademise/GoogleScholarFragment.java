package com.example.akademise;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;


public class GoogleScholarFragment extends Fragment {
    private TextView tvGoogleScholar;
    private TextView url_edit;
    private Button btnSend;
    private TextView total_citations;
    private RecyclerView recyclerView;
    private List<String> titles;
    private List<String> desc;


    Profile profile;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_google_scholar, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        tvGoogleScholar=view.findViewById(R.id.tvGoogleScholarUrl);
        url_edit=view.findViewById(R.id.etGS_Url);
        btnSend=view.findViewById(R.id.btnGS_Url);
        total_citations=view.findViewById(R.id.tvGS_Total_Citations_Number);
        recyclerView = view.findViewById(R.id.rv_GS_Project);
        profile =(Profile)getArguments().getSerializable("profile");
        total_citations.setText(profile.getCitations());
        titles = new ArrayList<>();
        desc = new ArrayList<>();
        if(me()){

        }
        else{
            tvGoogleScholar.setVisibility(View.INVISIBLE);
            url_edit.setVisibility(View.INVISIBLE);
            btnSend.setVisibility(View.INVISIBLE);

        }

        readJSON();

        GoogleScholarRVAdapter adapter = new GoogleScholarRVAdapter(getActivity(), titles,desc);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));


        //tvGoogleScholar.setText(profile.getScholar_profile_url());

    }
    private boolean me() {
        return getArguments().getInt("other", 0) == 0;
    }

    public void readJSON(){
        final JSONObject obj;
        try {
            JSONArray array=new JSONArray(profile.getProjects());
        final int n = array.length();
        for (int i = 0; i < n; ++i) {
            final JSONObject person = array.getJSONObject(i);
            titles.add((person.getString("title")));
            desc.add((person.getString("venue")));
        }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

}