package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static android.content.Context.MODE_PRIVATE;

public class RequestAdapter extends RecyclerView.Adapter<RequestAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;

    List<Request> requests;
    Context context;

    public RequestAdapter(Context ct, List<Request> prj) {
        context = ct;
        requests = prj;

    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.request_row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Map<String, String> user = requests.get(position).getRequesterUser();
        String user_ = user.get("name") + " " + user.get("name");
        holder.username.setText(user_);
        holder.projectName.setText(requests.get(position).getProject().get("name"));
        loadIDData();
        holder.accept.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                HashMap<String, String> c = new HashMap<>();
                c.put("project_id", requests.get(position).getProjectId().toString());
                c.put("user_id", requests.get(position).getRequesterId().toString());

                Call<Invitation> call = akademiseApi.addCollab(c, "Bearer " + myToken);

                call.enqueue(new Callback<Invitation>() {
                    @Override
                    public void onResponse(Call<Invitation> call, Response<Invitation> response) {

                        if (!response.isSuccessful()) {
                            Log.d("Project", "onResponse: not successful");
                            return;
                        }

                    }

                    @Override
                    public void onFailure(Call<Invitation> call, Throwable t) {

                        Log.d("Project", "onFailure: failed");

                    }
                });

            }
        });

        holder.reject.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                intent = new Intent(context, ProjectDetailsUserActivity.class);
                Toast.makeText(context, context.toString(), Toast.LENGTH_LONG).show();
                intent.putExtra("request", requests.get(position));
                context.startActivity(intent);
            }
        });
    }


    private void loadData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }


    @Override
    public int getItemCount() {
        if (requests.isEmpty()) {
            return 0;
        }

        return requests.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView username;
        TextView projectName;
        Button accept;
        Button reject;
        View mView;


        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            username = itemView.findViewById(R.id.textView12);
            projectName = itemView.findViewById(R.id.textViewProject);
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
