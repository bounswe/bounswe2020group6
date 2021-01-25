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

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static android.content.Context.MODE_PRIVATE;

public class PopUpAdapter extends RecyclerView.Adapter<PopUpAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL ;
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    Profile profile;
    List<Request> requests;
    List<Notifications> notifs;
    Context context;

    public PopUpAdapter(Context ct, List<Request> prj, List<Notifications> notif) {
        context = ct;
        requests = prj;
        notifs=notif;
        Collections.reverse(notifs);
        Collections.reverse(requests);
        loadData();
        loadIDData();
        baseURL=ct.getString(R.string.baseUrl);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.popup_row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        //Map<String, String> user = requests.get(position).getRequesterUser();
        //String user_ = user.get("name") + " " + user.get("surname");
        String user_name;
        if(position%2==1){
            holder.username.setBackgroundColor(context.getResources().getColor( R.color.light_green));
        }
        holder.username.setClickable(true);
        if(position<notifs.size()) {
            if (notifs.get(position).getType() != 5) {
                holder.projectName.setText("Project: " + notifs.get(position).getProject().getTitle());
                if (notifs.get(position).getType() == 0) {
                    user_name = notifs.get(position).getAccepter().getName() + " "
                            + notifs.get(position).getAccepter().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("accepted");
                }
                if (notifs.get(position).getType() == 1) {
                    user_name = notifs.get(position).getParticipant().getName() + " "
                            + notifs.get(position).getParticipant().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("joined");
                }
                if (notifs.get(position).getType() == 2) {
                    user_name = notifs.get(position).getParticipant().getName() + " "
                            + notifs.get(position).getParticipant().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("removed");
                }
                if (notifs.get(position).getType() == 3) {
                    user_name = notifs.get(position).getParticipant().getName() + " "
                            + notifs.get(position).getParticipant().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("removed");
                }
                if (notifs.get(position).getType() == -1) {
                    user_name = notifs.get(position).getAccepter().getName() + " "
                            + notifs.get(position).getAccepter().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("rejected");
                }
            } else {
                holder.projectName.setText("");
                user_name = notifs.get(position).getParticipant().getName() + " "
                        + notifs.get(position).getParticipant().getSurname();
                holder.username.setText(user_name);
                holder.type.setText("followed you");
            }
        }
        else{
            holder.projectName.setText(requests.get(position-notifs.size()).getProject().getTitle());
            user_name = requests.get(position-notifs.size()).getRequesterUser().get("name") + " "
                    + requests.get(position-notifs.size()).getRequesterUser().get("surname");
            holder.username.setText(user_name);
            if(requests.get(position-notifs.size()).getRequestType()==0){
                holder.type.setText("Invitation");
            }
            else{
                holder.type.setText("Request");
            }
        }
        loadIDData();

        holder.type.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (position < notifs.size()) {
                    Call<Notifications> call =akademiseApi.deleteNotification(notifs.get(position).getId(), "Bearer " + myToken);
                    call.enqueue(new Callback<Notifications>() {
                        @Override
                        public void onResponse(Call<Notifications> call, Response<Notifications> response) {
                            if (!response.isSuccessful()) {
                                return;
                            }
                        }

                        @Override
                        public void onFailure(Call<Notifications> call, Throwable t) {

                        }
                    });
                }
            }
        });

        holder.username.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (position < notifs.size()) {
                    Call<Profile> call = akademiseApi.getMyProfile(notifs.get(position).getAccepterId(), "Bearer " + myToken);
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
                else{
                    Call<Profile> call = akademiseApi.getMyProfile(requests.get(position-notifs.size()).getRequesterId(), "Bearer " + myToken);
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
        if (notifs.isEmpty()) {
            return 0;
        }

        return notifs.size()+requests.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView username;
        TextView projectName;
        TextView type;
        View mView;


        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            username = itemView.findViewById(R.id.tv_popup_user);
            projectName = itemView.findViewById(R.id.tv_popup_row_project_name);
            type = itemView.findViewById(R.id.tv_popup_req_inv);
            mView = itemView;


        }
    }

    private void loadIDData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }
}
