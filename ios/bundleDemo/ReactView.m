//
//  ReactView.m
//  bundleDemo
//
//  Created by alcat on 6/2/16.
//  Copyright © 2016 alcat. All rights reserved.
//

#import "ReactView.h"
#import "RCTRootView.h"

@implementation ReactView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
 */


- (void) awakeFromNib {
    [self initReact];
}

- (void) initReact {

    NSString *urlString = @"http://192.168.64.221:8081/index.ios.bundle?platform=ios&dev=true";
    NSURL *jsCodeLocation = [NSURL URLWithString:urlString];

    // For production use, this `NSURL` could instead point to a pre-bundled file on disk:
    //
    //   NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    //
    // To generate that file, run the curl command and add the output to your main Xcode build target:
    //
    //   curl http://localhost:8081/index.ios.bundle -o main.jsbundle
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName: @"bundleDemo"
                                                 initialProperties:nil
                                                     launchOptions:nil];

    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

    [self addSubview:rootView];
    rootView.frame = self.bounds;
}


@end
