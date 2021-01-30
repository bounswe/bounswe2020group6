package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.List;
import java.util.Map;

import static android.content.Context.MODE_PRIVATE;
//recycler view for viewing contents(see search received ewuest for a project)

public class RequestAdapter extends RecyclerView.Adapter<RequestAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    Profile profile;
    //list of requests
    List<Request> requests;
    Context context;

    //init api, retrofit
    //load my user id and token
    public RequestAdapter(Context ct, List<Request> prj) {
        context = ct;
        requests = prj;
        loadData();
        loadIDData();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

    }

    @NonNull
    @Override
    //customize the view holder

    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.request_row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        //show received requests
        //show username , surname
        Map<String, String> user = requests.get(position).getRequesterUser();
        String user_ = user.get("name") + " " + user.get("surname");

        holder.username.setText(user_);
        holder.username.setClickable(true);
        holder.projectName.setText(requests.get(position).getProject().getTitle());
        loadIDData();
        holder.accept.setOnClickListener(new View.OnClickListener() {
            @Override
            //accept the request and add as a collaborator
            public void onClick(View v) {
                Collab c = new Collab(requests.get(position).getProjectId().toString(), requests.get(position).getRequesterId().toString());
                Call<Collab> call = akademiseApi.addCollab(c, "Bearer " + myToken);

                call.enqueue(new Callback<Collab>() {
                    @Override
                    public void onResponse(Call<Collab> call, Response<Collab> response) {

                        if (!response.isSuccessful()) {
                            Log.d("Project", "onResponse: not successful");
                            return;
                        }

                    }

                    @Override
                    public void onFailure(Call<Collab> call, Throwable t) {

                        Log.d("Project", "onFailure: failed");

                    }
                });

            }
        });
//reject the reuqest and delete it
        holder.reject.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Collab c = new Collab(requests.get(position).getProjectId().toString(), requests.get(position).getRequesterId().toString());
                Call<Collab> call = akademiseApi.deleteReq(requests.get(position).getRequestId(), "Bearer " + myToken);

                call.enqueue(new Callback<Collab>() {
                    @Override
                    public void onResponse(Call<Collab> call, Response<Collab> response) {

                        if (!response.isSuccessful()) {
                            Log.d("Project", "onResponse: not successful");
                            return;
                        }

                    }

                    @Override
                    public void onFailure(Call<Collab> call, Throwable t) {

                        Log.d("Project", "onFailure: failed");

                    }
                });
            }
        });
        //go to profile
        holder.username.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Call<Profile> call = akademiseApi.getMyProfile(requests.get(position).getRequesterId(), "Bearer " + myToken);
                call.enqueue(new Callback<Profile>() {
                    @Override
                    public void onResponse(Call<Profile> call, Response<Profile> response) {
                        if (!response.isSuccessful()) {
                            return;
                        }
                        profile = response.body();
                        Intent intent = new Intent(context, ProfileActivity.class);
                        intent.putExtra("user", profile);
                        context.startActivity(intent);

                    }

                    @Override
                    public void onFailure(Call<Profile> call, Throwable t) {
                    }
                });
            }
        });

    }


    private void loadData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    //get how many contents in recycler view

    @Override
    public int getItemCount() {
        if (requests.isEmpty()) {
            return 0;
        }

        return requests.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        //name of the requester
        TextView username;
        //name of the project
        TextView projectName;
        //buttons to accept and reject
        Button accept;
        Button reject;
        View mView;


        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            username = itemView.findViewById(R.id.textView12);
            projectName = itemView.findViewById(R.id.tv_req_row_project_name);
            accept = itemView.findViewById(R.id.button);
            reject = itemView.findViewById(R.id.button2);
            mView = itemView;


        }
    }

    private void loadIDData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }
}
