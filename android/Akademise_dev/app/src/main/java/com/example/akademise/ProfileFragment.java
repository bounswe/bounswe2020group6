package com.example.akademise;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class ProfileFragment extends Fragment {
    private Button statsAndOverviewButton;
    private Button publicationsButton;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        statsAndOverviewButton = view.findViewById(R.id.stats_and_overview);
        publicationsButton = view.findViewById(R.id.publications);

        System.out.println(statsAndOverviewButton.getText().toString());

        statsAndOverviewButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) { // NOT WORKING FOR NOW !
                System.out.println("Hellawwww");
                getFragmentManager().beginTransaction().replace(R.id.flFragment, new HomeFragment()).commit();
            }
        });

        return inflater.inflate(R.layout.fragment_profile, container, false);

    }
}
