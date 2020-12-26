package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import androidx.fragment.app.Fragment;

public class RequestInvitationFragment extends Fragment {


    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private String myToken;
    private Integer myId;
    private Integer projectId;
    RecyclerView recyclerView;
    List<Request> requests;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        projectId = this.getArguments().getInt("project_id");

        return inflater.inflate(R.layout.fragment_requests_and_invitations, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {

        super.onViewCreated(view, savedInstanceState);
        loadData();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadIDData();


        Button btnAdd = view.findViewById(R.id.btnInvite);
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                invite();
            }
        });

    getRequests(projectId);

    }


    private void loadData() {
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    private void getRequests(Integer projectId) {
        List<Request> mod_req = new ArrayList<Request>();
        Call<List<Request>> call = akademiseApi.getRequests("Bearer " + myToken);
        call.enqueue(new Callback<List<Request>>() {
            @Override
            public void onResponse(Call<List<Request>> call, Response<List<Request>> response) {

                if (!response.isSuccessful()) {
                    Log.d("Request", "onResponse: not successful");
                    return;
                }

                requests = response.body();

                for (int i = 0; i < requests.size(); i++) {
                    Request req = requests.get(i);
                    if (req.getProjectId() == projectId) {
                        mod_req.add(req);
                    }

                }

                recyclerView = getView().findViewById(R.id.rv_recyclerView2);
                RequestAdapter recyclerViewAdapter = new RequestAdapter(getContext(), mod_req);
                recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
                recyclerView.setAdapter(recyclerViewAdapter);
            }

            @Override
            public void onFailure(Call<List<Request>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });


    }

    private void invite() {
        List<Integer> i = new ArrayList<Integer>() {{
            add(myId);
            add(1);
            add(projectId);
            add(0);
        }};
        Invitation invitation = new Invitation(i);
        Call<Invitation> call = akademiseApi.addInvitation(invitation, "Bearer " + myToken);
        call.enqueue(new Callback<Invitation>() {
            @Override
            public void onResponse(Call<Invitation> call, Response<Invitation> response) {
                if (!response.isSuccessful()) {
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getContext(), "Couldnt send invitation ", Toast.LENGTH_LONG).show();
                    return;
                }
                Invitation invResponse = response.body();
                Toast.makeText(getActivity(), "Successful. ", Toast.LENGTH_LONG).show();

            }

            @Override
            public void onFailure(Call<Invitation> call, Throwable t) {
                Toast.makeText(getContext(), "Be sure to be connected. ", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });

    }

    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }


}


